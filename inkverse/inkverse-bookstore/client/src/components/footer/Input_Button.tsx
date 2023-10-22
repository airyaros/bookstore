import { Card, Input, Button, Typography } from "@material-tailwind/react";

export function SubscribeForm() {
  return (
    <Card color="transparent" shadow={false} className="w-full">
      <Typography variant="h9" color="blue-gray">
        Enter your email
      </Typography>
      <form className="mt-2 mb-2 w-full max-w-screen-md sm:w-80">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Email"
            className="w-full"
            crossOrigin={undefined}
          />
        </div>
        <Button
          className="mt-3 font-mulish bg-[#237943] text-white text-xs"
          fullWidth
        >
          Subscribe to our newsletter
        </Button>
      </form>
    </Card>
  );
}
