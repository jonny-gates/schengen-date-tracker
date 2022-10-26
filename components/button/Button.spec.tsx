import { render, screen } from "@testing-library/react";
import Button from ".";
import user from "@testing-library/user-event";

describe("Button", () => {
  it("renders the inner text", () => {
    render(<Button>Hello</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Hello");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled={true}>Button</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is enabled by default", () => {
    render(<Button>Button</Button>);
    expect(screen.getByRole("button")).toBeEnabled();
  });

  it("fires onClick event when clicked", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Button</Button>);

    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
