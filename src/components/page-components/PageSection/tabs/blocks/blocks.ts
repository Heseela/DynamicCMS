import { type FC } from "react";
import TextBlock from "./text-block";
import ImageBlock from "./image-block";
import CardsBlock from "./card/card-block";
import RefItemBlock from "./ref-item.block";
import FormBlock from "./form-block";
import { EBlock } from "../../../../../Types/blocks.types";

export type BlockComponentProps = {
    sectionIdx: number;
    blockIdx: number;
}

export const blocks: Partial<Record<EBlock, FC<BlockComponentProps>>> = {
    [EBlock.Text]: TextBlock,
    [EBlock.Image]: ImageBlock,
    [EBlock.Cards]: CardsBlock,
    [EBlock.RefItem]: RefItemBlock,
    [EBlock.Form]: FormBlock,
}