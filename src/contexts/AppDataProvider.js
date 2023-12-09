'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/utility/context/auth';
import axiosInstance from '@/utility/axios';

const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState('');
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(user);
  const [myGroups, setMyGroups] = useState([]);
  const [otherGroups, setOtherGroups] = useState([]);
  const [myGroupsMap, setMyGroupsMap] = useState();
  const [otherGroupsMap, setOtherGroupsMap] = useState();
  const [contextVersion, setContextVersion] = useState(0);
  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    refreshGroups();
  }, [groups]);

  const refreshGroups = async () => {
    if (
      groups.groups !== undefined &&
      groups.groups.length > 0 &&
      currentUser
    ) {
      const userExists = (group) => {
        return group.participants.some(
          (participant) => participant.userId === currentUser.uid
        );
      };

      const updatedMyGroups = groups.groups
        .filter((group) => userExists(group))
        .map((group) => ({ ...group, groupType: 'myGroup' }));
      const updatedOtherGroups = groups.groups
        .filter((group) => !userExists(group))
        .map((group) => ({ ...group, groupType: 'otherGroup' }));

      setMyGroups(updatedMyGroups);
      setOtherGroups(updatedOtherGroups);
      const myGroupsMap = new Map();
      const otherGroupsMap = new Map();

      myGroups.forEach((group) => {
        myGroupsMap.set(group._id, group.participants);
      });

      otherGroups.forEach((group) => {
        otherGroupsMap.set(group._id, group.participants);
      });

      setMyGroupsMap(myGroupsMap);
      setOtherGroupsMap(otherGroupsMap);
    }
  };
  const fetchGroups = async () => {
    await axiosInstance
      .get('/groups')
      .then((res) => {
        setGroups(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewGroup = async (groupName, groupDescription, currentUser) => {
    const postData = {
      groupName: groupName,
      groupDescription: groupDescription,
      participants: {
        userId: currentUser.uid,
        username: currentUser.displayName,
      },
    };

    await axiosInstance
      .post('/groups/addNewGroup', postData)
      .then((response) => {
        // console.log('Response:', response.data);
        fetchGroups();
        setContextVersion((prevVersion) => prevVersion + 1);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const addParticipant = async (groupId, userID, userName) => {
    const putData = {
      userId: userID,
      username: userName,
    };

    await axiosInstance
      .put(`/groups/addGroupParticipant?groupId=${groupId}`, putData)
      .then((response) => {
        // console.log('Response:', response.data);
        fetchGroups();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const updateGroupId = (newGroupId) => {
    setGroupId(newGroupId);
  };

  return (
    <AppDataContext.Provider
      value={{
        groups,
        fetchGroups,
        myGroups,
        otherGroups,
        addNewGroup,
        myGroupsMap,
        otherGroupsMap,
        addParticipant,
        updateGroupId,
        groupId,
        currentUser,
        contextVersion,
        refreshGroups,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  return useContext(AppDataContext);
};
