import React from 'react';
import TeamMembersSearch from './ChatBoxTeamMembersSearch';

const ChatboxLeftPanel = (props: any) => {
  const { teamData } = props;

  return (
    <div style={{ overflow: 'hidden' }}>
      <TeamMembersSearch teamData={teamData} />
    </div>
  );
};

export default ChatboxLeftPanel;
