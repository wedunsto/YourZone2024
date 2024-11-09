import HomeButton from "../../HomeButton";
import BudgetsButton from "./BudgetsButton";
import TransactionsButton from "./TransactionsButton";

const ButtonMenu = () => {
    return(
        <div className="flex flex-col ml-5 space-y-5">
            <HomeButton />
            <TransactionsButton />
            <BudgetsButton  />
        </div>
    );
}

export default ButtonMenu;