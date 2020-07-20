import Vue from 'vue';
import Buefy from 'buefy';
import AdminForm from "./components/AdminForm";
import AdminTable from "./components/AdminTable";
import IconButton from "./components/IconButton";
import InputFormCalendar from "./components/inputs/InputFormCalendar";
import InputFormCheck from "./components/inputs/InputFormCheck";
import InputFormFile from "./components/inputs/InputFormFile";
import InputFormMultiSelect from "./components/inputs/InputFormMultiSelect";
import InputFormRadio from "./components/inputs/InputFormRadio";
import InputFormSelect from "./components/inputs/InputFormSelect";
import InputFormText from "./components/inputs/InputFormText";
import InputFormTimePicker from "./components/inputs/InputFormTimePicker";
import Layout from "./components/Layout";
import Icon from "./components/Icon";
import LayoutFooter from "./components/LayoutFooter";
import LayoutMenu from "./components/LayoutMenu";
import LayoutMenuItem from "./components/LayoutMenuItem";
import LayoutNavbar from "./components/LayoutNavbar";
import Messages from "./components/Messages";
import Pagination from "./components/Pagination";
import Dashboard from "./components/Dashboard";

Vue.use(Buefy);

const renderers = {
  'LayoutRenderer': Layout,
  'IconRenderer': Icon,
  'LayoutNavbarRenderer': LayoutNavbar,
  'LayoutFooterRenderer': LayoutFooter,
  'MenuRenderer': LayoutMenu,
  'MenuItemRenderer': LayoutMenuItem,
  'ButtonRenderer': IconButton,
  'TableRenderer': AdminTable,
  'PaginationRenderer': Pagination,
  'MessagesRenderer': Messages,
  'FormRenderer': AdminForm,
  'FormInputTextRenderer': InputFormText,
  'FormInputPasswordRenderer': InputFormText,
  'FormInputNumberRenderer': InputFormText,
  'FormInputEmailRenderer': InputFormText,
  'FormInputTelRenderer': InputFormText,
  'FormInputColorRenderer': InputFormText,
  'FormInputSearchRenderer': InputFormText,
  'FormInputUrlRenderer': InputFormText,
  'FormInputFileRenderer': InputFormFile,
  'FormInputTextareaRenderer': InputFormText,
  'FormInputSelectRenderer': InputFormSelect,
  'FormInputRadioRenderer': InputFormRadio,
  'FormInputCheckRenderer': InputFormCheck,
  'FormInputCheckboxRenderer': InputFormCheck,
  'FormInputCalendarRenderer': InputFormCalendar,
  'FormInputTimeRenderer': InputFormTimePicker,
  'FormInputMultiSelectRenderer': InputFormMultiSelect,

  'DashboardRenderer': Dashboard,
};

const BulmaAdminComponents = {
  install: (vue, options) => {
    const componentsToRegister = {
      ...renderers,
      ...options
    };
    Object.keys(componentsToRegister).forEach(component => {
      vue.component(component, componentsToRegister[component])
    });
  }
};

export default BulmaAdminComponents;
