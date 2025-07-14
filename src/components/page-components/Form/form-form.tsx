import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form";
import { 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  GripVertical, 
  MoreHorizontal, 
  Plus, 
  X 
} from "lucide-react";
import { fields as formFields } from "./fields/fields";
import AddFormFieldDialog from "./form-field-add-dialog";
import { useState } from "react";
import { FormDtoSchema, type TFormDto } from "../../../Models/form.model";
import toast from "react-hot-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import SubmitButton from "../../../Global/Button";

type Props = {
  defaultValues?: Partial<TFormDto> & { id: string };
  onSubmitForm: (values: TFormDto) => Promise<void>;
};

export default function FormForm({ defaultValues, onSubmitForm }: Props) {
  const [isPending, setIsPending] = useState(false);
  
  const form = useForm<TFormDto>({
    resolver: zodResolver(FormDtoSchema),
    defaultValues: defaultValues ?? {
      title: "",
      fields: [],
      submitBtnLabel: "Submit"
    }
  });

  async function onSubmit(values: TFormDto) {
    setIsPending(true);
    try {
      await onSubmitForm(values);
      toast.success(defaultValues ? "Updated successfully" : "Form created");
    } catch (e) {
      toast.error("An error occurred");
      console.error(e);
    } finally {
      setIsPending(false);
    }
  }

  const title = useWatch({
    control: form.control,
    name: "title",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="space-y-6 pb-40">
          <header className="container">
            <h3 className="text-3xl font-bold capitalize max-w-[50ch] break-words">
              {title || "[Untitled]"}
            </h3>
          </header>
          <section className="border-y sticky z-[1] backdrop-blur-3xl top-0">
            <section className="container flex items-center justify-between py-3">
              <h4>{defaultValues ? "Editing Form" : "Creating new Form"}</h4>
              <SubmitButton
                isLoading={isPending}
                title="Save"
              />
            </section>
          </section>

          <section className="container space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Eg. Contact Form"
                      minLength={3}
                      maxLength={50}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Fields />

            <FormField
              control={form.control}
              name="submitBtnLabel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Submit Button Label</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
        </section>
      </form>
    </Form>
  );
}

function Fields() {
  const form = useFormContext<TFormDto>();

  const { fields, append, remove, insert, swap } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  return (
    <FormField
      control={form.control}
      name="fields"
      render={() => (
        <FormItem>
          <FormLabel>Fields <span className="text-destructive">*</span></FormLabel>

          <section className="space-y-2">
            {fields.map((f, idx) => {
              return (
                <FormField
                  key={f.id}
                  control={form.control}
                  name={`fields.${idx}`}
                  render={({ field }) => {
                    const fieldType = field.value.type;
                    const FormFieldComponent = formFields[fieldType];
                    const fieldError = Array.isArray(form.formState.errors.fields) && 
                      form.formState.errors.fields[idx];

                    return (
                      <FormItem>
                        <FormControl>
                          <Accordion type="multiple">
                            <AccordionItem
                              value={f.id} 
                              className={cn(
                                "bg-secondary/50 border !border-b-1 rounded-md overflow-hidden",
                                fieldError && "bg-destructive/10 border-destructive"
                              )}
                            >
                              <section className="relative flex items-center gap-2 px-2">
                                <button type="button" className="hover:cursor-grab">
                                  <GripVertical className="text-muted-foreground" size={16} />
                                </button>
                                <AccordionTrigger className="text-sm hover:no-underline py-2.5">
                                  <section className="space-x-3">
                                    <span className="font-light">{(idx + 1).toString().padStart(2, "0")}</span>
                                    <Badge className="capitalize">{fieldType}</Badge>
                                  </section>
                                </AccordionTrigger>
                                <section className="absolute right-10">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger className="p-2">
                                      <MoreHorizontal size={16} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="top">
                                      {idx !== 0 && (
                                        <DropdownMenuItem onClick={() => swap(idx, idx - 1)}>
                                          <ChevronUp /> Move Up
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuItem onClick={() => swap(idx, idx + 1)}>
                                        <ChevronDown /> Move Down
                                      </DropdownMenuItem>
                                      <AddFormFieldDialog
                                        onSelect={(field) => {
                                          insert(idx + 1, field);
                                        }}
                                      >
                                        <Button
                                          variant={"ghost"}
                                          className="w-full justify-start !px-2 !py-1.5 hover:!bg-accent font-normal"
                                        >
                                          <span className="text-muted-foreground"><Plus /></span>
                                          Add Below
                                        </Button>
                                      </AddFormFieldDialog>
                                      <DropdownMenuItem onClick={() => insert(idx + 1, field.value)}>
                                        <Copy /> Duplicate
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => remove(idx)}>
                                        <X /> Remove
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </section>
                              </section>
                              <AccordionContent className="px-3 py-5 bg-background">
                                {FormFieldComponent && (
                                  <FormFieldComponent idx={idx} />
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              );
            })}
          </section>

          <FormControl>
            <section>
              <AddFormFieldDialog
                onSelect={(field) => {
                  append(field);
                }}
              >
                <Button
                  type="button"
                  variant={"outline"}
                  size={"sm"}
                  className="font-normal text-xs"
                >
                  <Plus size={16} /> Add Field
                </Button>
              </AddFormFieldDialog>
            </section>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}