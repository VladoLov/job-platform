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
import CreateJobForm from "@/components/forms/CreateJobForm";

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

const testimonials = [
  {
    quote:
      "Working with [Your Service Name] was a game-changer for my career. Their testimonials captured my strengths perfectly and helped me stand out in a competitive job market.",
    name: "John Doe",
    company: "Tech Innovators",
  },
  {
    quote:
      "I couldn’t believe the impact a well-crafted testimonial had on my job search. [Your Service Name] delivered authentic, powerful endorsements that impressed every hiring manager.",
    name: "Jane Smith",
    company: "Creative Minds",
  },
  {
    quote:
      "Fast, professional, and impactful—[Your Service Name] crafted testimonials that made me look as good as I am. My job offers increased almost immediately!",
    name: "Bob Johnson",
    company: "Innovative Professionals",
  },
];

const stats = [
  { id: 0, value: "10k+", label: "Monthly active job seekers" },
  {
    id: 1,
    value: "48h",
    label: "Average time to fill a position",
  },
  { id: 2, value: "97%", label: "Customer satisfaction rate" },
  { id: 3, value: "500+", label: "Companies using our platform" },
];

export default function PostJobPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <Card className="col-span-1 lg:col-span-2">
        {/*   <CardHeader>
          <CardTitle>Hey there is from post job</CardTitle>
        </CardHeader> */}
        <CreateJobForm />
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
          <CardContent className="space-y-6">
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
            {/** testemonial */}
            <div className="space-y-4 mt-6">
              {testimonials.map((testimonial) => (
                <blockquote
                  key={testimonial.name}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="text-sm text-muted-foreground italic">
                    "{testimonial.quote}"
                  </p>
                  <footer className="mt-2 text-sm font-medium">
                    - {testimonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>
            {/** we will render stats here */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div className="rounded bg-muted p-4" key={stat.id}>
                  <h4 className="text-2xl font-bold">{stat.value}</h4>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
