import AdminLayoutContainer from "@/_layouts/adminLayout/AdminLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutContainer>{children}</AdminLayoutContainer>;
}
