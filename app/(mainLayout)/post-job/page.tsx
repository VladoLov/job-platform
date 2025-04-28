import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import ArcjetLogo from "@/public/arcjet.jpg";
import InngestLogo from "@/public/inngest-locale.png";
import Image from "next/image";

const companies = [
  {
    id: 0,
    name: "Arcjet",
    logo: ArcjetLogo,
  },
  {
    id: 1,
    name: "Inngest",
    logo: InngestLogo,
  },
  {
    id: 2,
    name: "Arcjet",
    logo: ArcjetLogo,
  },
  {
    id: 3,
    name: "Inngest",
    logo: InngestLogo,
  },
  {
    id: 4,
    name: "Arcjet",
    logo: ArcjetLogo,
  },
  {
    id: 5,
    name: "Inngest",
    logo: InngestLogo,
  },
];

export default function PostJobPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Hey there is from post job</CardTitle>
        </CardHeader>
      </Card>
      <div className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Trusted by Industry Leaders
            </CardTitle>
            <CardDescription>
              Join thousands of companies hiring top talent on our platform. Our
              job board is trusted by industry leaders to connect with the best
              candidates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Company logos */}
            <div className="grid grid-cols-3 gap-4">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="rounded-lg opacity-80 transition-opacity hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
