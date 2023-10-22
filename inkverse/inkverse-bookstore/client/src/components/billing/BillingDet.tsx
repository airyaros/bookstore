import { Checkbox, Input } from "@material-tailwind/react";

function BillingDet() {
  return (
    <div className="w-2/3 bg-white p-6 font-mulish">
      <div className="text-zinc-800 text-xl font-bold mb-6">
        <h1>Billing Details</h1>
      </div>
      <div className="flex mb-4 space-x-4">
        {/* First Name */}
        <div className="w-1/2">
          <label
            className="text-slate-900 text-base font-bold leading-tight tracking-tight"
            htmlFor="firstName"
          >
            First Name
          </label>
          <Input
            type="text"
            id="firstName"
            placeholder="First Name"
            crossOrigin={undefined}
          />
        </div>
        {/* Last Name */}
        <div className="w-1/2">
          <label
            className="text-slate-900 text-base font-bold leading-tight tracking-tight"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <Input
            type="text"
            id="lastName"
            placeholder="Last Name"
            crossOrigin={undefined}
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="text-slate-900 text-base font-bold leading-tight tracking-tight"
          htmlFor="country"
        >
          Country
        </label>
        <Input
          type="text"
          id="country"
          placeholder="Country"
          crossOrigin={undefined}
        />
      </div>
      <div className="flex mb-4 space-x-4">
        {/* Street Address */}
        <div className="w-1/2">
          <label
            className="text-slate-900 text-base font-bold leading-tight tracking-tight"
            htmlFor="house"
          >
            Street Address
          </label>
          <Input
            type="text"
            id="house"
            placeholder="House Number or No Apt"
            crossOrigin={undefined}
          />
        </div>
        {/* Town/City */}
        <div className="w-1/2">
          <label
            className="text-slate-900 text-base font-bold leading-tight tracking-tight"
            htmlFor="city"
          >
            Town/City
          </label>
          <Input
            type="text"
            id="city"
            placeholder="City"
            crossOrigin={undefined}
          />
        </div>
      </div>
      <div className="flex mb-4 space-x-4">
        {/* State */}
        <div className="w-1/2">
          <label
            className="text-slate-900 text-base font-bold leading-tight tracking-tight"
            htmlFor="state"
          >
            State
          </label>
          <Input
            type="text"
            id="state"
            placeholder="State"
            crossOrigin={undefined}
          />
        </div>
        {/* Post Code */}
        <div className="w-1/2">
          <label
            className="text-slate-900 text-base font-bold leading-tight tracking-tight"
            htmlFor="postcode"
          >
            Post code
          </label>
          <Input
            type="text"
            id="postcode"
            placeholder="Post Code"
            crossOrigin={undefined}
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="text-slate-900 text-base font-bold leading-tight tracking-tight"
          htmlFor="phonenumber"
        >
          Phone number
        </label>
        <Input
          type="number"
          id="phonenumber"
          placeholder="Phone number"
          crossOrigin={undefined}
        />
      </div>
      <div className="mb-4">
        <label
          className="text-slate-900 text-base font-bold leading-tight tracking-tight"
          htmlFor="email"
        >
          Email
        </label>
        <Input
          type="text"
          id="email"
          placeholder="Email"
          crossOrigin={undefined}
        />
      </div>
      {/* ...rest of the input fields */}
      <div className="flex items-center mb-4 space-x-2">
        <Checkbox
          id="createAccountCheckbox"
          color="blue"
          crossOrigin={undefined}
        />
        <label
          htmlFor="createAccountCheckbox"
          className="text-zinc-800 text-base font-normal cursor-pointer"
        >
          Create an account?
        </label>
      </div>
    </div>
  );
}

export default BillingDet;
