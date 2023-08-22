class StringValidator {
    private _target: string;
    private _errors: string[] = [];
    private _displayName: string | undefined;


    public constructor(target: string) {
        this._target = target;
    }

    public expect(condition: boolean, error: string) {
        if (!condition) {
            this._errors.push(error);
        }

        return this;
    }



    public displayName(name: string) {
        this._displayName = name;
        return this;
    }

    public errors() {
        return this._errors;
    }

    public errorString() {
        return this._displayName + ": " + this._errors.join(", ");
    }

    public valid() {
        return this._errors.length === 0;
    }

    public str() {
        return this._target;
    }


    public trim() {
        this._target = this._target.trim();

        return this;
    }

    public matchesString(str: string) {
        return this.expect(str === this._target, "does not match constraint");
    }

    public email() {
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        return this.expect(re.test(this._target), "invalid email format");
    }

    public alphanumericUnderscore() {
        const re = /^\w+$/i;

        return this.expect(re.test(this._target), "not alphanumeric (can contain underscore)");
    }

    public min(i: number) {
        return this.expect(this._target.length >= i, `too short (min ${i} characters, got ${this._target.length})`);
    }

    public max(i: number) {
        return this.expect(this._target.length <= i, `too long (max ${i} characters, got ${this._target.length})`);
    }
}

class ObjectStringValidatorChild extends StringValidator {
    private _parent: ObjectStringValidator;
    private _fieldName: string;

    public constructor(target: string, parent: ObjectStringValidator, fieldName: string) {
        super(target);

        this._parent = parent;
        this._fieldName = fieldName;
    }

    public end() {
        return this._parent;
    }

    public getFieldName() {
        return this._fieldName;
    }
}

class ObjectStringValidator {
    private _validators: ObjectStringValidatorChild[] = [];
    private _object: Record<string, string>;

    public constructor(object: Record<string, string>) {
        this._object = object;
    }

    private keys() {
        return Object.keys(this._object) as (keyof Record<string, string>)[]
    };

    public field(name: string) {
        if (this.keys().indexOf(name) == -1) {
            throw new Error("cannot validate field " + name + ", key does not exist");
        }

        const validator = new ObjectStringValidatorChild(this._object[name], this, name);
        this._validators.push(validator);

        return validator;
    }

    public valid() {
        for (const validator of this._validators) {
            if (!validator.valid()) return false;
        }

        return true;
    }

    public errors() {
        let errors: Record<string, string[]> = {};

        for (const validator of this._validators) {
            if (validator.valid()) continue;

            errors[validator.getFieldName()] = validator.errors();
        }

        return errors;
    }

    public errorsDisplay() {
        let errors: string[] = [];

        for (const validator of this._validators) {
            if (validator.valid()) continue;

            errors.push(validator.errorString());
        }

        return errors;
    }
}

export {
    StringValidator,
    ObjectStringValidatorChild,
    ObjectStringValidator
};