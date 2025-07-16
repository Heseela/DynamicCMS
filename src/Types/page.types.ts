import type { THeroSectionDto } from "../Models/hero.model";
import type { TMetadataDto, TPageSection } from "../Models/page.model";
import { EAlignment, EAlignmentExcludeCenter, type PaginatedResponse } from "./global.types"


export enum EHeroLayoutTypes {
    Jumbotron = "jumbotron",
    Split_Hero = "splitHero"
}

export type THeroLayout = {
    type: EHeroLayoutTypes.Jumbotron,
    alignment: EAlignment
} | {
    type: EHeroLayoutTypes.Split_Hero,
    imagePosition: EAlignmentExcludeCenter,
}

export type TPagesResponse = PaginatedResponse<{
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
}>

export type TPage = {
    id: string;
    name: string;
    slug: string;
    sections: TPageSection[];
    metadata: TMetadataDto;
    heroSections: THeroSectionDto[];
    updatedAt: Date;
    createdAt: Date;
}