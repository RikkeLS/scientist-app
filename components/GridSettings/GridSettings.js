import styled from "styled-components"

const Layout = styled.div`
    display: grid;
    grid-template-columns: 30% 30% 40%;
    gap:10px;
    width:var(--width-window);
`


const UpperRightSection = styled.section`
    grid-row:1/4;
    grid-column: 3;
`
const UpperLeftSection = styled.section`
    grid-row:1;
    grid-column: 1/3;
`
const DynamicSection = styled.section`
    grid-row: 2;
    grid-column: 1/3;
    display: grid;
    grid-template-columns: 50% 50%;
    gap:10px;
    margin-left: 10px;
`
const GridEntryPlacement = styled.div`
    grid-row: ${({$rownumber})=>($rownumber)};
    grid-column: 1/span ${({$columnspan})=>($columnspan)};
`

export function GridEntry({children,$rownumber,$columnspan}){
    return (
        <GridEntryPlacement
         $rownumber={$rownumber}
         $columnspan={$columnspan}>
         {children}</GridEntryPlacement>

    )
}


export function PapersFieldPlacement({children}) {
    return (
        <UpperRightSection>{children}</UpperRightSection>
    )
}

export function ProfileImagePlacement({children}) {
    return (
        <UpperLeftSection>{children}</UpperLeftSection>
    )
}
export function ContentPlacement({children}) {
    return (
        <DynamicSection>{children}</DynamicSection>
    )
}

export function GridLayout({children}) {
    return (
        <Layout>{children}</Layout>
    )
}