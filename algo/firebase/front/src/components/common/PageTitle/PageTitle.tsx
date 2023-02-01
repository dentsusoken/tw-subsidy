import usePageTitle from "./usePageTitle";

const PageTitle = () => {
    const { getTitle } = usePageTitle();

    return <h2 className="mt-5 ml-5 text-lg font-bold">{getTitle()}</h2>
};

export default PageTitle;