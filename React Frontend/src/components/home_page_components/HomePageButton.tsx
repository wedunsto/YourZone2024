interface HomePageButtonProp {
    imageSrc: string
}

const HomePageButton =({imageSrc}: HomePageButtonProp)=> {
    return(
        <div className="bg-black">
            <img src={imageSrc} />
        </div>
    );
};

export default HomePageButton;