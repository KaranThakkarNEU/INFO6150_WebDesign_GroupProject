import ProtectedRouteComponent from '@/components/protectedRouter';

export default function HomePage() {
  return (
    <ProtectedRouteComponent>
      <div>Main page</div>
    </ProtectedRouteComponent>
  );
}
