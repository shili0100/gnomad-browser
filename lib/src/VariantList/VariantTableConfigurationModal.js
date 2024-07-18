"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const polished_1 = require("polished");
const react_1 = __importStar(require("react"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const styled_components_1 = __importDefault(require("styled-components"));
// @ts-expect-error TS(2307) FIXME: Cannot find module '@fortawesome/fontawesome-free/... Remove this comment to see the full error message
const arrow_down_svg_1 = __importDefault(require("@fortawesome/fontawesome-free/svgs/solid/arrow-down.svg"));
// @ts-expect-error TS(2307) FIXME: Cannot find module '@fortawesome/fontawesome-free/... Remove this comment to see the full error message
const arrow_up_svg_1 = __importDefault(require("@fortawesome/fontawesome-free/svgs/solid/arrow-up.svg"));
// @ts-expect-error TS(2307) FIXME: Cannot find module '@fortawesome/fontawesome-free/... Remove this comment to see the full error message
const grip_lines_svg_1 = __importDefault(require("@fortawesome/fontawesome-free/svgs/solid/grip-lines.svg"));
const ui_1 = require("@gnomad/ui");
const ColumnList = styled_components_1.default.ol `
  padding: 0;
  line-height: 1.5;
`;
const ColumnListItem = styled_components_1.default.li `
  display: flex;
  align-items: center;
  padding: 0.5em 0;
  border-bottom: 1px solid #ddd;
  background: #fafafa;
`;
const ColumnLabel = styled_components_1.default.label `
  display: flex;
  flex-grow: 1;
  align-items: center;

  input {
    margin-right: 1em;
  }
`;
const ReorderColumnButton = (0, styled_components_1.default)(ui_1.Button) `
  width: 28px;
  height: 28px;
  padding: 0;
  margin-left: 1ch;
  text-align: center;

  img {
    width: 12px;
    height: 12px;
  }

  &:disabled {
    img {
      opacity: 0.25;
    }
  }
`;
const getContextType = (context) => {
    if (context.transcript_id) {
        return 'transcript';
    }
    if (context.gene_id) {
        return 'gene';
    }
    return 'region';
};
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
const TableColumnSelectionModal = ({ availableColumns, context, defaultColumns, selectedColumns, onCancel, onSave, }) => {
    const contextType = getContextType(context);
    const [columnPreferences, setColumnPreferences] = (0, react_1.useState)(availableColumns
        .filter((column) => column.key !== 'variant_id')
        .map((column) => {
        const selectionIndex = selectedColumns.indexOf(column.key);
        return Object.assign(Object.assign({}, column), { isSelected: selectionIndex !== -1, selectionIndex });
    })
        .sort((colA, colB) => {
        const isColASelected = colA.selectionIndex !== -1;
        const isColBSelected = colB.selectionIndex !== -1;
        if (isColASelected && isColBSelected) {
            return colA.selectionIndex - colB.selectionIndex;
        }
        if (isColASelected && !isColBSelected) {
            return -1;
        }
        if (!isColASelected && isColBSelected) {
            return 1;
        }
        return colA.heading.localeCompare(colB.heading);
    }));
    const onDragEnd = (0, react_1.useCallback)((result) => {
        if (!result.destination) {
            return;
        }
        setColumnPreferences(
        // @ts-expect-error TS(2345) FIXME: Argument of type 'unknown[]' is not assignable to ... Remove this comment to see the full error message
        reorder(columnPreferences, result.source.index, result.destination.index));
    }, [columnPreferences]);
    return (react_1.default.createElement(ui_1.Modal, { id: "table-column-selection", size: "large", title: "Configure table", footer: react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ui_1.Button, { onClick: onCancel }, "Cancel"),
            react_1.default.createElement(ui_1.PrimaryButton, { onClick: () => {
                    onSave(columnPreferences.filter((c) => c.isSelected).map((c) => c.key));
                }, style: { marginLeft: '1ch' } }, "Save")), onRequestClose: onCancel },
        react_1.default.createElement("p", null, "Select columns to include in the variant table. Drag and drop or use the up/down buttons to reorder columns. The first column in the table will always be the variant ID."),
        react_1.default.createElement(react_beautiful_dnd_1.DragDropContext, { onDragEnd: onDragEnd },
            react_1.default.createElement(react_beautiful_dnd_1.Droppable, { droppableId: "droppable" }, (droppableProvided) => (react_1.default.createElement(ColumnList, Object.assign({ ref: droppableProvided.innerRef }, droppableProvided.droppableProps),
                columnPreferences.map((column, columnIndex) => {
                    return (react_1.default.createElement(react_beautiful_dnd_1.Draggable, { key: column.key, draggableId: column.key, index: columnIndex }, (draggableProvided) => (react_1.default.createElement(ColumnListItem, Object.assign({ ref: draggableProvided.innerRef }, draggableProvided.dragHandleProps, draggableProvided.draggableProps),
                        react_1.default.createElement("img", { src: grip_lines_svg_1.default, alt: "", "aria-hidden": "true", width: 16, height: 16, style: { marginRight: '15px' } }),
                        react_1.default.createElement(ColumnLabel, { htmlFor: `column-selection-${column.key}` },
                            react_1.default.createElement("input", { type: "checkbox", id: `column-selection-${column.key}`, checked: column.isSelected, onChange: (e) => {
                                    setColumnPreferences(columnPreferences.map((c) => {
                                        return Object.assign(Object.assign({}, c), { isSelected: c.key === column.key ? e.target.checked : c.isSelected });
                                    }));
                                } }),
                            react_1.default.createElement("div", null,
                                column.heading,
                                react_1.default.createElement("br", null),
                                column.description,
                                column.shouldShowInContext &&
                                    column.shouldShowInContext(context, contextType) === false &&
                                    column.contextNotes && (react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement("br", null),
                                    react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                                    " ",
                                    column.contextNotes)))),
                        react_1.default.createElement(ReorderColumnButton, { disabled: columnIndex === 0, onClick: () => {
                                setColumnPreferences([
                                    ...columnPreferences.slice(0, columnIndex - 1),
                                    columnPreferences[columnIndex],
                                    columnPreferences[columnIndex - 1],
                                    ...columnPreferences.slice(columnIndex + 1),
                                ]);
                            } },
                            react_1.default.createElement("span", { style: (0, polished_1.hideVisually)() }, "Move column up"),
                            react_1.default.createElement("img", { src: arrow_up_svg_1.default, alt: "", "aria-hidden": "true" })),
                        react_1.default.createElement(ReorderColumnButton, { disabled: columnIndex === columnPreferences.length - 1, onClick: () => {
                                setColumnPreferences([
                                    ...columnPreferences.slice(0, columnIndex),
                                    columnPreferences[columnIndex + 1],
                                    columnPreferences[columnIndex],
                                    ...columnPreferences.slice(columnIndex + 2),
                                ]);
                            } },
                            react_1.default.createElement("span", { style: (0, polished_1.hideVisually)() }, "Move column down"),
                            react_1.default.createElement("img", { src: arrow_down_svg_1.default, alt: "", "aria-hidden": "true" }))))));
                }),
                droppableProvided.placeholder)))),
        react_1.default.createElement(ui_1.Button, { onClick: () => setColumnPreferences(availableColumns
                .filter((column) => column.key !== 'variant_id')
                .map((column) => {
                const selectionIndex = defaultColumns.indexOf(column.key);
                return Object.assign(Object.assign({}, column), { isSelected: selectionIndex !== -1, selectionIndex });
            })
                .sort((colA, colB) => {
                const isColASelected = colA.selectionIndex !== -1;
                const isColBSelected = colB.selectionIndex !== -1;
                if (isColASelected && isColBSelected) {
                    return colA.selectionIndex - colB.selectionIndex;
                }
                if (isColASelected && !isColBSelected) {
                    return -1;
                }
                if (!isColASelected && isColBSelected) {
                    return 1;
                }
                return colA.heading.localeCompare(colB.heading);
            })) }, "Restore defaults")));
};
exports.default = TableColumnSelectionModal;
//# sourceMappingURL=VariantTableConfigurationModal.js.map