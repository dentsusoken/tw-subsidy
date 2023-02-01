import Container from "../../common/Container";
import Header from "../../common/Header";
import ConfirmLink from "../../common/ListConfirmLink";

const SubsidyMenuMain = () => {
    return (
        <>
            <Header />
            <main>
                <Container>
                    <div className="flex flex-col gap-[19px] w-fit mx-auto mt-16">
                        <ConfirmLink actor="subsidy" type="application" />
                        <ConfirmLink actor="subsidy" type="VC" />
                    </div>
                </Container>
            </main>
        </>
    )
};

export default SubsidyMenuMain;