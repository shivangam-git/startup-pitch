"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { z } from "zod";
// import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { formSchema } from "@/lib/validation";
import { createPitch } from "@/lib/action";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const [image, setImage] = useState("");
  // const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
  title: formData.get("title") as string,
  description: formData.get("description") as string,
  category: formData.get("category") as string,
  image,
  pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        // toast({
        //   title: "Success",
        //   description: "Your startup pitch has been created successfully",
        // });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        // toast({
        //   title: "Error",
        //   description: "Please check your inputs and try again",
        //   variant: "destructive",
        // });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      // toast({
      //   title: "Error",
      //   description: "An unexpected error has occurred",
      //   variant: "destructive",
      // });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />

        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />

        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="image" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="image"
          name="image"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
        />

        {errors.image && <p className="startup-form_error">{errors.image}</p>}

        {/* Image preview for http(s) and base64 data URLs with base64 validation */}
        {image && typeof image === "string" && image.trim() !== "" && (
          (image.startsWith("http") ||
            (image.startsWith("data:image/") && /^data:image\/(png|jpeg|jpg|gif);base64,[A-Za-z0-9+/=]+$/.test(image))) && (
            <div className="startup-form_image-preview" style={{ marginTop: 12 }}>
              <img
                src={image}
                alt="Startup Preview"
                style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8, border: "1px solid #eee" }}
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          )
        )}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>

        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;