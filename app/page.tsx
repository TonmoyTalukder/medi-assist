"use client";

import ChatComponent from "@/components/chatComponent";
import { ModeToggle } from "@/components/modetoggle";
import ReportComponent from "@/components/reportComponent";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Settings } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import mediAi from './mediAi.png'

const HomeComponent = () => {
  const { toast } = useToast();
  const [reportData, setreportData] = useState("");

  const onReportConfirmation = (data: string) => {
    setreportData(data);
    toast({
      description: "Report Updated!",
      duration: 2000,
    });
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col">
      <header className="sticky top-0 z-10 flex h-[100px] bg-background items-center gap-1 border-b px-4 py-4">
        <h1 className="flex flex-row items-center gap-4 w-full text-xl font-semibold text-[#D90013]">
          <Image
            src={mediAi}
            alt="Description of image"
            width={30}
            height={30}
          />
          <span className="flex flex-row">AI Medi Assist</span>
        </h1>
        <div className="flex flex-row justify-end gap-2">
          <ModeToggle />
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Settings />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[80vh]">
              <ReportComponent onReportConfirmation={onReportConfirmation} />
            </DrawerContent>
          </Drawer>
        </div>
      </header>
      <Separator className="my-4" />

      <main
        style={{
          marginTop: "1vh",
        }}
        className="flex-1 p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <div className="hidden md:flex flex-col">
          <ReportComponent onReportConfirmation={onReportConfirmation} />
        </div>
        <div className="lg:col-span-2">
          <ChatComponent reportData={reportData} />
        </div>
      </main>
    </div>
  );
};

export default HomeComponent;
