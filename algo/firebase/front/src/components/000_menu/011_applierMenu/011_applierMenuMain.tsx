import Container from "../../common/Container";
import Header from "../../common/Header";
import ConfirmLink from "../../common/ListConfirmLink";
import StepLink from "../../common/StepLink";
import Arrow from "../../common/Arrow";

const ApplierMenuMain = () => {
    return (
        <>
            <Header />
            <main>
                <Container>
                    <div className="flex gap-[19px] w-fit mx-auto mt-16">
                        <ConfirmLink actor="applier" type="application" />
                        <ConfirmLink actor="applier" type="VC" />
                    </div>
                </Container>
                <Container>
                    <div className="flex flex-col justify-center items-center w-[294px] h-[416px] mx-auto bg-color-line-shadow">
                        <StepLink step={1} />
                        <Arrow />
                        <StepLink step={2} />
                        <Arrow />
                        <StepLink step={3} />
                        <Arrow />
                        <StepLink step={4} />
                    </div>
                </Container>
            </main>
        </>
    )
};

export default ApplierMenuMain;