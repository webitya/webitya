"use client";

import ReceiverInput from "@/components/EmailMarketingSoftware/ReceiverEmail";
import SendEmailsFunction from "@/components/EmailMarketingSoftware/SendEmailsFunction";
import SenderForm from "@/components/EmailMarketingSoftware/SenderForm";
import TemplateEditor from "@/components/EmailMarketingSoftware/TemplateEditor";
import Footer from "@/components/FooterEl";

import { Typography, Box } from "@mui/material";

const EmailMarketingSoftware = () => {
  return (
    <>
      <SenderForm />
      <ReceiverInput />
      <TemplateEditor />
      <SendEmailsFunction />
      <Footer />
    </>
  );
};

export default EmailMarketingSoftware;
