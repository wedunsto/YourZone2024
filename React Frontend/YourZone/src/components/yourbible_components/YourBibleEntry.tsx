// Collapsable table entries for YourBible

interface YourBibleEntryProp{
    collapseText: String,
    expandText: String,
}
const YourBibleEntry = ({collapseText, expandText}: YourBibleEntryProp) => {
    return (
        <div className="collapse collapse-arrow">
            <input type="radio" name="my-accordion-2" checked={true} /> 
            <div className="collapse-title text-xl font-medium">
                {collapseText}
            </div>
            <div className="collapse-content"> 
                {expandText}
            </div>
        </div>
    );
}

export default YourBibleEntry;