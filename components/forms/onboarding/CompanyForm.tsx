import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema } from "@/app/utils/zodSchemas";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { countryList } from "@/app/utils/countriesList";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/components/general/UploadThingReexported";
import { createCompany } from "@/app/utils/actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { XIcon } from "lucide-react";

export default function CompanyForm() {
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      about: "",
      location: "",
      logo: "",
      name: "",
      website: "",
      xAccount: "",
    },
  });

  const [pending, setPending] = useState(false);

  async function onSubmit(data: z.infer<typeof companySchema>) {
    try {
      setPending(true);
      await createCompany(data);
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        console.log("something went wrong", error.message);
      }
    } finally {
      setPending(false);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select  location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Worldwide</SelectLabel>
                        <SelectItem value="worldwide">
                          <span>🌍</span>
                          <span>Worldwide / Remote</span>
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>Location</SelectGroup>
                      {countryList.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          <span>{country.flagEmoji}</span>
                          <span className="pl-2">{country.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="xAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>X (Twitter) Account</FormLabel>
                  <FormControl>
                    <Input placeholder="@yourcompany" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your company"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Company Logo</FormLabel>
                <FormControl>
                  <div>
                    {field.value ? (
                      <div className="relative w-fit">
                        <Image
                          src={field.value}
                          alt="logo"
                          width={100}
                          height={100}
                          className="rounded-lg"
                        />
                        <Button
                          className="absolute -top-2 -right-2"
                          type="button"
                          variant={"destructive"}
                          size={"icon"}
                          onClick={() => {
                            field.onChange("");
                          }}
                        >
                          <XIcon className="size-4" />
                        </Button>
                      </div>
                    ) : (
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          field.onChange(res[0].ufsUrl);
                        }}
                        onUploadError={(error: Error) => {
                          // Do something with the error.
                          console.log(error);
                        }}
                        className="ut-button:bg-primary ut-button:text-white ut-button:hover::bg-primary/10 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary ut-upload-icon:size-10 ut-button:py-1 ut-button:px-2 ut-button:m-2"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={pending}
          >
            {pending ? "Submitting..." : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
