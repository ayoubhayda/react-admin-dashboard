import _extends from "@babel/runtime/helpers/esm/extends";
export const getGridLocalization = (gridTranslations, coreTranslations) => {
  var _coreTranslations$com;
  return {
    components: {
      MuiDataGrid: {
        defaultProps: {
          localeText: _extends({}, gridTranslations, {
            MuiTablePagination: (coreTranslations == null || (_coreTranslations$com = coreTranslations.components) == null || (_coreTranslations$com = _coreTranslations$com.MuiTablePagination) == null ? void 0 : _coreTranslations$com.defaultProps) || {}
          })
        }
      }
    }
  };
};