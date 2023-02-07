import Container from "../../common/Container";
import Header from "../../common/Header";
import ConfirmLink from "../../common/ListConfirmLink";

const TaxMenuMain = () => {
    return (
        <>
            <Header />
            <main>
                <Container>
                    <div className="flex flex-col gap-[19px] w-fit mx-auto mt-16">
                        <ConfirmLink actor="tax" type="application" />
                        <ConfirmLink actor="tax" type="VC" />
                    </div>
                </Container>
            </main>
        </>
    )
};

export default TaxMenuMain;