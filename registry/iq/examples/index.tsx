import type { ComponentType } from "react"

import ChoiceFieldDemo from "./choice-field-demo"
import PhoneFieldDemo from "./phone-field-demo"
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
import LineChartDemo from "./line-chart-demo"
import LineChartSizes from "./line-chart-sizes"
import LineChartStates from "./line-chart-states"
import LineChartTypes from "./line-chart-types"
import PaginationDemo from "./pagination-demo"
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
import SkeletonBones from "./skeleton-bones"
import SkeletonCard from "./skeleton-card"
import SkeletonDemo from "./skeleton-demo"
import SkeletonRecipes from "./skeleton-recipes"
import StatusDotDemo from "./status-dot-demo"
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
  "skeleton-bones": SkeletonBones,
  "skeleton-card": SkeletonCard,
  "skeleton-demo": SkeletonDemo,
  "skeleton-recipes": SkeletonRecipes,
  "status-dot-demo": StatusDotDemo,
  "tabs-pill-demo": TabsPillDemo,
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
