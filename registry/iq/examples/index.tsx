import type { ComponentType } from "react"

import ChoiceFieldDemo from "./choice-field-demo"
import ComboboxAutocompleteDemo from "./combobox-autocomplete-demo"
import ComboboxSelectDemo from "./combobox-select-demo"
import ComboboxSelectMultiple from "./combobox-select-multiple"
import ComboboxSizes from "./combobox-sizes"
import ComboboxStates from "./combobox-states"
import OptionPanelDemo from "./option-panel-demo"
import OptionPanelStates from "./option-panel-states"
import PhoneFieldDemo from "./phone-field-demo"
import SelectFieldDemo from "./select-field-demo"
import ToggleDemo from "./toggle-demo"
import ModalDemo from "./modal-demo"
import ToolbarDemo from "./toolbar-demo"
import ScrollAreaDemo from "./scroll-area-demo"
import PageHeaderDemo from "./page-header-demo"
import RadioGroupDemo from "./radio-group-demo"
import FormFieldDemo from "./form-field-demo"
import FormFieldSizes from "./form-field-sizes"
import FormFieldStatus from "./form-field-status"
import CheckboxDemo from "./checkbox-demo"
import CheckboxGroup from "./checkbox-group"
import CheckboxStates from "./checkbox-states"
import DataTableCompact from "./data-table-compact"
import DataTableDemo from "./data-table-demo"
import DataTableStates from "./data-table-states"
import LineChartColors from "./line-chart-colors"
import LineChartDemo from "./line-chart-demo"
import LineChartSizes from "./line-chart-sizes"
import LineChartStates from "./line-chart-states"
import LineChartTypes from "./line-chart-types"
import InputDemo from "./input-demo"
import InputStates from "./input-states"
import PageGridDemo from "./page-grid-demo"
import PaginationDemo from "./pagination-demo"
import PartnerLogoDemo from "./partner-logo-demo"
import PartnerLogoInTable from "./partner-logo-in-table"
import PaginationLayouts from "./pagination-layouts"
import PaginationPositions from "./pagination-positions"
import BadgeAnatomy from "./badge-anatomy"
import BadgeDemo from "./badge-demo"
import BadgeSizes from "./badge-sizes"
import BadgeVariants from "./badge-variants"
import DeltaBadgeDemo from "./delta-badge-demo"
import PillDemo from "./pill-demo"
import PillClickable from "./pill-clickable"
import PillColors from "./pill-colors"
import PillDisabled from "./pill-disabled"
import PillSizes from "./pill-sizes"
import RingChartDemo from "./ring-chart-demo"
import RingChartItems from "./ring-chart-items"
import RingChartStates from "./ring-chart-states"
import RingChartValues from "./ring-chart-values"
import SkeletonBones from "./skeleton-bones"
import SkeletonCard from "./skeleton-card"
import SkeletonDemo from "./skeleton-demo"
import SkeletonRecipes from "./skeleton-recipes"
import CalendarDemo from "./calendar-demo"
import DatePickerDemo from "./date-picker-demo"
import DropdownDemo from "./dropdown-demo"
import LabelBlockDemo from "./label-block-demo"
import SearchBarDemo from "./search-bar-demo"
import SearchBarStates from "./search-bar-states"
import SelectionBarDemo from "./selection-bar-demo"
import SelectionBarTable from "./selection-bar-table"
import TabsLineDemo from "./tabs-line-demo"
import TooltipDemo from "./tooltip-demo"
import TriggerDemo from "./trigger-demo"
import StatusDotDemo from "./status-dot-demo"
import ToastDemo from "./toast-demo"
import ToastOptionsExample from "./toast-options"
import ToastTones from "./toast-tones"
import TabsPillDemo from "./tabs-pill-demo"
import StatusDotMarkOnly from "./status-dot-mark-only"
import ValueSlotDemo from "./value-slot-demo"
import BreadcrumbDemo from "./breadcrumb-demo"
import BreadcrumbDirect from "./breadcrumb-direct"
import BreadcrumbWithNextLink from "./breadcrumb-link"
import BreadcrumbTruncation from "./breadcrumb-truncation"
import ButtonAsLink from "./button-as-link"
import ButtonDanger from "./button-danger"
import ButtonDangerOutline from "./button-danger-outline"
import ButtonDemo from "./button-demo"
import ButtonDisabled from "./button-disabled"
import ButtonGhost from "./button-ghost"
import ButtonIcon from "./button-icon"
import ButtonLoading from "./button-loading"
import ButtonPrimary from "./button-primary"
import ButtonSecondary from "./button-secondary"
import ButtonSizes from "./button-sizes"
import ButtonWithIcon from "./button-with-icon"
import FlagDemo from "./flag-demo"
import FlagSizes from "./flag-sizes"
import FlagWithLabel from "./flag-with-label"
import StatCardDemo from "./stat-card-demo"
import StatCardInfo from "./stat-card-info"
import StatCardLayouts from "./stat-card-layouts"
import StatCardTones from "./stat-card-tones"

// Each key must match a file name in this folder: the docs read the source from disk.
export const examples = {
  "choice-field-demo": ChoiceFieldDemo,
  "phone-field-demo": PhoneFieldDemo,
  "select-field-demo": SelectFieldDemo,
  "toggle-demo": ToggleDemo,
  "modal-demo": ModalDemo,
  "toolbar-demo": ToolbarDemo,
  "scroll-area-demo": ScrollAreaDemo,
  "page-header-demo": PageHeaderDemo,
  "radio-group-demo": RadioGroupDemo,
  "form-field-demo": FormFieldDemo,
  "form-field-sizes": FormFieldSizes,
  "form-field-status": FormFieldStatus,
  "checkbox-demo": CheckboxDemo,
  "checkbox-group": CheckboxGroup,
  "checkbox-states": CheckboxStates,
  "data-table-compact": DataTableCompact,
  "data-table-demo": DataTableDemo,
  "data-table-states": DataTableStates,
  "pagination-demo": PaginationDemo,
  "pagination-layouts": PaginationLayouts,
  "pagination-positions": PaginationPositions,
  "badge-anatomy": BadgeAnatomy,
  "badge-demo": BadgeDemo,
  "badge-sizes": BadgeSizes,
  "badge-variants": BadgeVariants,
  "delta-badge-demo": DeltaBadgeDemo,
  "pill-demo": PillDemo,
  "pill-clickable": PillClickable,
  "pill-colors": PillColors,
  "pill-disabled": PillDisabled,
  "pill-sizes": PillSizes,
  "ring-chart-demo": RingChartDemo,
  "ring-chart-items": RingChartItems,
  "ring-chart-states": RingChartStates,
  "ring-chart-values": RingChartValues,
  "skeleton-bones": SkeletonBones,
  "skeleton-card": SkeletonCard,
  "skeleton-demo": SkeletonDemo,
  "skeleton-recipes": SkeletonRecipes,
  "status-dot-demo": StatusDotDemo,
  "page-grid-demo": PageGridDemo,
  "calendar-demo": CalendarDemo,
  "date-picker-demo": DatePickerDemo,
  "dropdown-demo": DropdownDemo,
  "label-block-demo": LabelBlockDemo,
  "search-bar-demo": SearchBarDemo,
  "search-bar-states": SearchBarStates,
  "selection-bar-demo": SelectionBarDemo,
  "selection-bar-table": SelectionBarTable,
  "tabs-line-demo": TabsLineDemo,
  "tooltip-demo": TooltipDemo,
  "trigger-demo": TriggerDemo,
  "input-demo": InputDemo,
  "input-states": InputStates,
  "partner-logo-demo": PartnerLogoDemo,
  "partner-logo-in-table": PartnerLogoInTable,
  "toast-demo": ToastDemo,
  "toast-options": ToastOptionsExample,
  "toast-tones": ToastTones,
  "combobox-autocomplete-demo": ComboboxAutocompleteDemo,
  "combobox-select-demo": ComboboxSelectDemo,
  "combobox-select-multiple": ComboboxSelectMultiple,
  "combobox-sizes": ComboboxSizes,
  "combobox-states": ComboboxStates,
  "option-panel-demo": OptionPanelDemo,
  "option-panel-states": OptionPanelStates,
  "tabs-pill-demo": TabsPillDemo,
  "line-chart-colors": LineChartColors,
  "line-chart-demo": LineChartDemo,
  "line-chart-sizes": LineChartSizes,
  "line-chart-states": LineChartStates,
  "line-chart-types": LineChartTypes,
  "status-dot-mark-only": StatusDotMarkOnly,
  "value-slot-demo": ValueSlotDemo,
  "breadcrumb-demo": BreadcrumbDemo,
  "breadcrumb-direct": BreadcrumbDirect,
  "breadcrumb-link": BreadcrumbWithNextLink,
  "breadcrumb-truncation": BreadcrumbTruncation,
  "button-demo": ButtonDemo,
  "button-primary": ButtonPrimary,
  "button-secondary": ButtonSecondary,
  "button-ghost": ButtonGhost,
  "button-danger": ButtonDanger,
  "button-danger-outline": ButtonDangerOutline,
  "button-sizes": ButtonSizes,
  "button-with-icon": ButtonWithIcon,
  "button-icon": ButtonIcon,
  "button-loading": ButtonLoading,
  "button-disabled": ButtonDisabled,
  "button-as-link": ButtonAsLink,
  "flag-demo": FlagDemo,
  "flag-sizes": FlagSizes,
  "flag-with-label": FlagWithLabel,
  "stat-card-demo": StatCardDemo,
  "stat-card-layouts": StatCardLayouts,
  "stat-card-tones": StatCardTones,
  "stat-card-info": StatCardInfo,
} satisfies Record<string, ComponentType>

export type ExampleName = keyof typeof examples
