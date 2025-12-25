import { AutoCompleteType } from './auto-complete-type.enum';

describe('AutoCompleteType enum', () => {
    it('should be defined', () => {
        expect(AutoCompleteType).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...AutoCompleteType } as any;
        expect(options).toEqual({
            on: 'on',
            off: 'off',
            address_line1: 'address-line1',
            address_line2: 'address-line2',
            address_line3: 'address-line3',
            address_level1: 'address-level1',
            address_level2: 'address-level2',
            address_level3: 'address-level3',
            address_level4: 'address-level4',
            street_address: 'street-address',
            country: 'country',
            country_name: 'country-name',
            postal_code: 'postal-code',
            name: 'name',
            additional_name: 'additional-name',
            family_name: 'family-name',
            given_name: 'given-name',
            honoric_prefix: 'honoric-prefix',
            honoric_suffix: 'honoric-suffix',
            nickname: 'nickname',
            organization_title: 'organization-title',
            username: 'username',
            new_password: 'new-password',
            current_password: 'current-password',
            bday: 'bday',
            bday_day: 'bday-day',
            bday_month: 'bday-month',
            bday_year: 'bday-year',
            sex: 'sex',
            one_time_code: 'one-time-code',
            organization: 'organization',
            cc_name: 'cc-name',
            cc_given_name: 'cc-given-name',
            cc_additional_name: 'cc-additional-name',
            cc_family_name: 'cc-family-name',
            cc_number: 'cc-number',
            cc_exp: 'cc-exp',
            cc_exp_month: 'cc-exp-month',
            cc_exp_year: 'cc-exp-year',
            cc_csc: 'cc-csc',
            cc_type: 'cc-type',
            transaction_currency: 'transaction-currency',
            transaction_amount: 'transaction-amount',
            language: 'language',
            url: 'url',
            email: 'email',
            photo: 'photo',
            tel: 'tel',
            tel_country_code: 'tel-country-code',
            tel_national: 'tel-national',
            tel_area_code: 'tel-area-code',
            tel_local: 'tel-local',
            tel_local_prefix: 'tel-local-prefix',
            tel_local_suffix: 'tel-local-suffix',
            tel_extension: 'tel-extension',
            impp: 'impp',
        });
    });
});
