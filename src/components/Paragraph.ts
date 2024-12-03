//
// Imports
//

import { Child, DE, ElementAttributes } from "@donutteam/document-builder";

//
// Component
//

export function Paragraph(children: Child): DE;
export function Paragraph(attributes: ElementAttributes, children: Child): DE;
export function Paragraph(childrenOrAttributes: ElementAttributes | Child, childrenAfterAttributes?: Child): DE
{
    let attributes: ElementAttributes = {};
    let children: Child;

    if (typeof childrenAfterAttributes !== "undefined")
    {
        attributes = childrenOrAttributes as ElementAttributes;
        children = childrenAfterAttributes;
    }
    else
    {
        children = childrenOrAttributes as Child;
    }

    if (children == null)
    {
        return new DE(null, null);
    }

    attributes.class = attributes.class
        ? "component-paragraph " + attributes.class
        : "component-paragraph";

    return new DE("p", attributes, children);
}