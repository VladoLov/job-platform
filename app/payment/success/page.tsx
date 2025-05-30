import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Link } from "lucide-react";
import React from "react";

export default function PaymentSuccess() {
  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="size-12 bg-green-500/30 p-2 text-green-500 rounded-full" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h2 className="text-xl font-semibold">Payment Successful</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight text-balance">
              Congrats your payment was successful
            </p>
            <Button asChild className="w-full mt-5">
              <Link href="/">Go to homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
