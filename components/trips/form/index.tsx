import Input from "../../forms/Input";
import {
  Field,
  FieldProps,
  Formik,
  FormikErrors,
  FormikProps,
  FormikValues,
} from "formik";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

interface TripFormProps {
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  defaultValues?: FormValues | null;
}

export interface FormValues {
  country: string;
  startDate: string;
  endDate: string;
}

const validate = (values: FormikValues) => {
  const errors: FormikErrors<FormValues> = {};

  if (!values.country) errors.country = "Required";
  if (!values.startDate) errors.startDate = "Required";
  if (!values.endDate) errors.endDate = "Required";

  if (values.startDate && values.endDate) {
    const start = dayjs(values.startDate);
    const end = dayjs(values.endDate);

    if (end.isSameOrBefore(start)) {
      errors.endDate = "End date must be after the start";
    }
  }

  return errors;
};

export default function TripForm({
  onSubmit,
  defaultValues,
  onCancel,
}: TripFormProps) {
  const initialValues = defaultValues || {
    country: "",
    startDate: "",
    endDate: "",
  };

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
    close();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {(props: FormikProps<FormValues>) => (
        <form
          className="flex h-full w-full flex-col divide-y bg-white"
          onSubmit={props.handleSubmit}
        >
          <div className="h-0 flex-1 overflow-y-auto">
            <div className="px-4 sm:px-6">
              <div className="pt-6 pb-5">
                <Field name="country">
                  {({ field, form: { errors } }: FieldProps) => (
                    <Input
                      {...field}
                      // @ts-ignore
                      error={props.touched.country && errors.country}
                      label="Country Visiting"
                    />
                  )}
                </Field>
              </div>
              <div className="pt-6 pb-5">
                <Field name="startDate">
                  {({ field, form: { errors } }: FieldProps) => (
                    <Input
                      {...field}
                      // @ts-ignore
                      error={props.touched.startDate && errors.startDate}
                      label="Start Date"
                      type="date"
                      description="The date you'll enter the EU"
                    />
                  )}
                </Field>
              </div>
              <div className="pt-6 pb-5">
                <Field name="endDate">
                  {({ field, form: { errors } }: FieldProps) => (
                    <Input
                      {...field}
                      // @ts-ignore
                      error={props.touched.endDate && errors.endDate}
                      label="End Date"
                      type="date"
                    />
                  )}
                </Field>
              </div>
            </div>
          </div>
          <div className="flex flex-shrink-0 justify-end px-4 py-4">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
