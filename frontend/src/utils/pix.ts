
export class Pix {
    private merchantName: string;
    private merchantCity: string;
    private pixKey: string;
    private amount: string;
    private txid: string;

    constructor(
        pixKey: string,
        merchantName: string,
        merchantCity: string,
        amount: number,
        txid: string = '***'
    ) {
        this.pixKey = pixKey;
        this.merchantName = this.formatString(merchantName, 25);
        this.merchantCity = this.formatString(merchantCity, 15);
        this.amount = amount.toFixed(2);
        this.txid = txid;
    }

    private formatString(str: string, max: number): string {
        return str
            .substring(0, max)
            .toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    private formatValue(id: string, value: string): string {
        const size = value.length.toString().padStart(2, '0');
        return `${id}${size}${value}`;
    }

    private getCRC16(payload: string): string {
        payload += '6304';
        let polinomio = 0x1021;
        let resultado = 0xffff;

        for (let i = 0; i < payload.length; i++) {
            resultado ^= payload.charCodeAt(i) << 8;
            for (let j = 0; j < 8; j++) {
                if ((resultado <<= 1) & 0x10000) {
                    resultado ^= polinomio;
                }
                resultado &= 0xffff;
            }
        }

        return this.formatValue('63', resultado.toString(16).toUpperCase().padStart(4, '0'));
    }

    public getPayload(): string {
        const payloadKeyString = [
            this.formatValue('00', 'BR.GOV.BCB.PIX'),
            this.formatValue('01', this.pixKey),
        ].join('');

        const payload = [
            this.formatValue('00', '01'),
            this.formatValue('26', payloadKeyString),
            this.formatValue('52', '0000'),
            this.formatValue('53', '986'),
            this.formatValue('54', this.amount),
            this.formatValue('58', 'BR'),
            this.formatValue('59', this.merchantName),
            this.formatValue('60', this.merchantCity),
            this.formatValue('62', this.formatValue('05', this.txid)),
        ].join('');

        return payload + this.getCRC16(payload);
    }
}
