import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import HeroTabContent from './tabs/hero-tab-content';
import ContentTabContent from './tabs/content-tab-content';
import SeoTabContent from './tabs/seo-tab-content';
import type { TPage } from '../../../Types/page.types';
import { PageDtoSchema, type TPageDto } from '../../../Models/page.model';
import toast from 'react-hot-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { generateSlug } from '../../../lib/utils';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { useCustomMutation } from '../../../Global/custom-muation';
import { QueryKey } from '../../../Types/query.types';
import SubmitButton from '../../../Global/Button';

type Props = {
    page: TPage
}

const tabs = [
    { label: "Hero", value: "hero" },
    { label: "Content", value: "content" },
    { label: "SEO", value: "seo" }
];

export default function PageForm({ page }: Props) {
    const form = useForm<TPageDto>({
        resolver: zodResolver(PageDtoSchema),
        defaultValues: page,
    });

    const { mutate, isPending } = useCustomMutation<TPageDto>({
        endPoint: `${QueryKey.PAGES}/${page.slug}`,
        queryKey: [QueryKey.PAGES],
        method: "patch",
    });

    const onSubmit = (data: TPageDto) => {
        console.log('Form data:', data); 
        mutate(data, {
            onSuccess: () => {
                toast.success("Page updated successfully");
            },
            onError: (error) => {
                toast.error(error.message || "Failed to update page");
            },
        });
    };

    const name = useWatch({
        control: form.control,
        name: "name",
    });

    const slug = useMemo(() => {
        const nonEmptyName = name || "Untitled";
        return generateSlug(nonEmptyName, nonEmptyName === "Untitled");
    }, [name]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='h-full'>
                <div className="h-full flex flex-col space-y-6">
                    <h2 className="px-8 text-3xl font-medium capitalize">{name || "Untitled"}</h2>

                    <div className="sticky top-0 z-[1] backdrop-blur-3xl border-y mb-0">
                        <div className="px-8 py-3 flex items-center justify-between flex-wrap gap-6">
                            <div className="text-sm flex gap-6">
                                <p>
                                    <span className="text-muted-foreground">Last Modified: </span>
                                    <time className="font-medium">
                                        {new Date(page.updatedAt).toLocaleString()}
                                    </time>
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Created: </span>
                                    <time className="font-medium">
                                        {new Date(page.createdAt).toLocaleString()}
                                    </time>
                                </p>
                            </div>

                            <SubmitButton
                                isLoading={isPending}
                                title={slug ? "Update" : "Save"}
                                showBackBtn={false}
                            />
                        </div>
                    </div>

                    <div className='grow grid grid-cols-3'>
                        <div className='col-span-2 border-r py-8'>
                            <div className='ml-8 pr-10'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name <span className='text-red-500'>*</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='py-5'
                                                    placeholder="Eg. About us"
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Tabs defaultValue="hero" className='mt-8 w-full'>
                                <TabsList className="pl-8 py-0 space-x-2 w-full bg-transparent border-b rounded-none h-auto justify-start">
                                    {tabs.map(t => (
                                        <TabsTrigger
                                            key={t.value}
                                            value={t.value}
                                            className="relative bg-transparent max-w-fit border-0 rounded-none px-3 py-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary"
                                        >
                                            {t.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                <div className='pl-8 pt-4 pr-10 pb-20'>
                                    <TabsContent value="hero">
                                        <HeroTabContent />
                                    </TabsContent>
                                    <TabsContent value="content">
                                        <ContentTabContent />
                                    </TabsContent>
                                    <TabsContent value="seo">
                                        <SeoTabContent />
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>

                        <div className='mr-8 pl-10 py-8'>
                            <div className='space-y-2'>
                                <Label>Slug</Label>
                                <Input
                                    className='py-5'
                                    value={slug}
                                    disabled
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
}