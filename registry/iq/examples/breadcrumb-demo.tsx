import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbOverflow,
  BreadcrumbOverflowItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/iq/ui/breadcrumb"

export default function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Admin</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbOverflow>
            <BreadcrumbOverflowItem asChild>
              <a href="#">Organization</a>
            </BreadcrumbOverflowItem>
            <BreadcrumbOverflowItem asChild>
              <a href="#">Accounts</a>
            </BreadcrumbOverflowItem>
            <BreadcrumbOverflowItem asChild>
              <a href="#">Users</a>
            </BreadcrumbOverflowItem>
          </BreadcrumbOverflow>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb item</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
