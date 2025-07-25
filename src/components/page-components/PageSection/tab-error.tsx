export const hasTabError = (form: any, tabValue: string) => {
    const errors = form.formState.errors;
    switch(tabValue) {
        case "hero":
            return !!errors.heroSections;
        case "content":
            return !!errors.sections;
        case "seo":
            return !!errors.metadata;
        default:
            return false;
    }
}