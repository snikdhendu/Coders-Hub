import { Request, Response } from "express";
import { Webhook } from "svix";
import { User } from "../models/User.js";

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const payloadString = req.body.toString("utf8");

    const svixHeaders: any = {
      "svix-id": req.headers["svix-id"] as string,
      "svix-timestamp": req.headers["svix-timestamp"] as string,
      "svix-signature": req.headers["svix-signature"] as string,
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY!);

    const evt: any = wh.verify(payloadString, svixHeaders);
    const { id, ...attributes } = evt.data;

    // Handle the webhooks
    const eventType = evt.type;
    if (eventType === "user.created") {
      console.log(`User ${id} was ${eventType}`);

      console.log(attributes);

      const firstName = attributes.first_name;
      const lastName = attributes.last_name;
      const email = attributes.email_addresses[0].email_address;
      const profileUrl = attributes.profile_image_url;

      const user = new User({
        clerkUserId: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        profileUrl: profileUrl,
      });

      await user.save();
      console.log("User saved to database");
    }

    res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  } catch (err: any) {
    console.error("Error handling webhook:", err);
    console.error("Headers:", req.headers);
    console.error("Payload:", req.body.toString("utf8"));
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
