"use client";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/public/Logo.jpg";
import { Card, CardContent } from "@/components/ui/card";
import UserTypeSelection from "./UserTypeForm";
import CompanyForm from "./CompanyForm";
import JobSeekerForm from "./JobSeekerForm";

type UserSelectionType = "jobSeeker" | "company" | null;

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  function handleUserTypeSelection(type: UserSelectionType) {
    setUserType(type);
    setStep(2);
  }

  function renderStep() {
    switch (step) {
      case 1:
        // return <p>User type selection form</p>;
        // we can use a component here for user type selection
        return <UserTypeSelection onSelect={handleUserTypeSelection} />;
      case 2:
        return userType === "company" ? (
          // <p>User is an company</p>
          // we can use a component here for company form
          <CompanyForm />
        ) : (
          <JobSeekerForm />
        );
      default:
        return null;
    }
  }
  return (
    <>
      <div className="flex items-center gap-4 mb-10">
        <Image src={Logo} alt="Logo" className="size-10" />
        <h1 className="text-4xl font-bold">
          Job
          <span className="text-primary">Platform</span>
        </h1>
      </div>
      <Card className="max-w-lg w-full">
        <CardContent className="px-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
}
