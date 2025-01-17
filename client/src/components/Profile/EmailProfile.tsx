const EmailProfile = ({ data }: { data: string | undefined }) => {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ul className="flex justify-between" role="list">
          <li>{data}</li>
        </ul>
      </dd>
    </div>
  );
};

export default EmailProfile;
