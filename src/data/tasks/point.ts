
class EverydayPoint {
    private static instance: EverydayPoint;

    static getInstance() {
        if (EverydayPoint.instance) return EverydayPoint.instance;
        EverydayPoint.instance = new EverydayPoint(0);
        return EverydayPoint.instance;
    }

    get point() {
        if (!this._point) {
            throw new Error('There is no subject');
        }
        return this._point;
    }

    set point(value) {
        this._point = value;
    }
    private constructor(private _point: number = 0) {}
}

export const everydayPoint = EverydayPoint.getInstance();