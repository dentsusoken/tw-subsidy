export type NumberAreaParams = {
    dividend: number;
    divisor: number;
}

const NumberArea = ({ dividend, divisor}: NumberAreaParams) => {
    return (
        <section className={"bg-search w-full h-11 text-center"}>
            <span className={"text-sm leading-11"}>{dividend}件中 - {divisor}件を表示</span>
        </section>
    )
};

export default NumberArea;