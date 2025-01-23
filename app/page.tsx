import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductForm } from "../components/product-form"

export default function Page() {
  return (
    <div className="min-h-screen w-full">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <Card className="border-none shadow-lg w-full overflow-hidden">
          <CardHeader className="text-center pb-4 sm:pb-8">
            <CardTitle className="font-display text-2xl sm:text-3xl break-words">Product Assistant</CardTitle>
            <CardDescription className="text-sm sm:text-lg mx-auto max-w-[90%] sm:max-w-2xl">
              Generate comprehensive PRDs, Epics, and User Stories using AI.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            <ProductForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

