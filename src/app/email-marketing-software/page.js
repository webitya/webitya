"use client"
import ReceiverInput from "@/components/EmailMarketingSoftware/ReceiverEmail"
import SendEmailsFunction from "@/components/EmailMarketingSoftware/SendEmailsFunction"
import SenderForm from "@/components/EmailMarketingSoftware/SenderForm"
import TemplateEditor from "@/components/EmailMarketingSoftware/TemplateEditor"


const EmailMarketingSoftware=()=>{
    return (
        <>
          <SenderForm/>
          <ReceiverInput/>
          <TemplateEditor/>
          <SendEmailsFunction/>
        </>
    )
}
export default EmailMarketingSoftware