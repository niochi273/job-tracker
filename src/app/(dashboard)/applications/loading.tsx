import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="w-full mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold">Applications</h1>
        <Skeleton className="h-7.5 w-full mt-1 rounded-2xl border" />
      </div>
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="flex flex-col gap-0 h-37 p-4">
            <CardHeader className="flex flex-row gap-5 items-center">
              <CardTitle>
                <Skeleton className="py-0.5 h-9 w-40" />
              </CardTitle>
              <Skeleton className="rounded-4xl mt-1 h-5 w-20 border border-transparent" />
              <Skeleton className="ml-auto h-5 w-20" />
            </CardHeader>
            <CardContent className="flex flex-col mt-2 gap-1">
              <Skeleton className="h-7 w-30" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-44" />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
