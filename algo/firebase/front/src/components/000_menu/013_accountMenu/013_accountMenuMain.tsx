import Container from "../../common/Container";
import Header from "../../common/Header";
import ConfirmLink from "../../common/ListConfirmLink";

const AccountMenuMain = () => {
    return (
        <>
            <Header />
            <main>
                <Container>
                    <div className="flex flex-col gap-[19px] w-fit mx-auto mt-16">
                        <ConfirmLink actor="account" type="application" />
                        <ConfirmLink actor="account" type="VC" />
                    </div>
                </Container>
            </main>
        </>
    )
};

export default AccountMenuMain;