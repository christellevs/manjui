export interface MenuItem {
    id?: string;
    value?: any;
    title?: string;
    description?: string;
    kind?: string;
    icon?: string;
    checked?: boolean;
    disabled?: boolean;
    activate?: () => void;
}
