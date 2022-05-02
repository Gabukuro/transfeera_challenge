import { useContext } from "react";
import SearchInput from "../SearchInput";
import StatusSelect from "../StatusSelect";
import { StyledContainer, FilterTabContainer, AddButton, StyledH1 } from "./style";
import { ReceiversContext } from '../../Context/ReceiverContext';


function FilterTab() {

    const { setShowModal } = useContext(ReceiversContext);

    return(
        <StyledContainer maxWidth={false}>
            <FilterTabContainer className="filter-tab">
                <StyledH1>Seus recebedores</StyledH1>
                <AddButton className="filter-tab__item" onClick={() => setShowModal(true)}/>
                <StatusSelect className="filter-tab__item" />
                <SearchInput className="filter-tab__item" />
            </FilterTabContainer>
        </StyledContainer>
    )
}

export default FilterTab;