import SearchInput from "../SearchInput";
import StatusSelect from "../StatusSelect";
import { StyledContainer, FilterTabContainer, AddButton } from "./style";

function FilterTab() {

    return(
        <StyledContainer maxWidth={false}>
            <FilterTabContainer className="filter-tab">
                <h1>Seus recebedores</h1>
                <AddButton className="filter-tab__item"/>
                <StatusSelect className="filter-tab__item" />
                <SearchInput className="filter-tab__item" />
            </FilterTabContainer>
        </StyledContainer>
    )
}

export default FilterTab;