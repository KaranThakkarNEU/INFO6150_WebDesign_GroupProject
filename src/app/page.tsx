import ProtectedRouteComponent from '@/components/protectedRoute';

export default function HomePage() {
  return (
    <ProtectedRouteComponent>
      <div>Main page</div>
    </ProtectedRouteComponent>
  );
}
