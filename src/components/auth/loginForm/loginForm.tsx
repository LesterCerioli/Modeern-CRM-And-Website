"use client";

import { useState } from "react";
import { ButtonLogin } from "../buttonLogin/buttonLogin";
import {
  PageContainer,
  Card,
  CardHeader,
  Title,
  Description,
  Form,
  InputGroup,
  Label,
  Input,
  SubmitButton,
  SelectTrigger,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectIcon,
} from "./styles";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "lucide-react";


interface LoginFormProps {
  onLogin: (role: "admin" | "accounting" | "finance" | "marketing" | "it" | "marketing" | "accounting-manager" | "finance-manager" | "marketing-manager" | "it-manager") => void;
}

type Credentials = {
  email: string;
  password: string;
  role: "admin" | "accounting" | "finance" | "marketing" | "it" | "marketing" | "accounting-manager" | "finance-manager" | "marketing-manager" | "it-manager" | "";
};

interface LoginResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string | null;
  error?: string;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

    
  async function getJwtToken(): Promise<string> {
    
    const response = await fetch("/api/auth/token", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to obtain JWT token");
    }

    const data = await response.json();
    

    return data.token;
  }

  
  async function loginWithJwt(jwt: string): Promise<LoginResponse> {
    

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: jwt,
        email: credentials.email,
        password: credentials.password,
        role: credentials.role,
      }),
    });

    const data: LoginResponse | { error: string } = await response
      .json()
      .catch(() => ({ error: "Internal error. Try again." }));

    

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    return data as LoginResponse;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!credentials.role) {
      setError("Please select a profile");
      return;
    }

    setIsLoading(true);
    console.group("[LoginForm] Login attempt");

    try {
      
      const jwt = await getJwtToken();

      
      const user = await loginWithJwt(jwt);

      
      onLogin(credentials.role as any);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Internal error. Try again.";
      
      setError(message);
    } finally {
      setIsLoading(false);
      console.groupEnd();
    }
  };

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <Title>Lucas Technology Service</Title>
          <Description>Our digital environment</Description>
        </CardHeader>

        <Form onSubmit={handleSubmit}>
          {error && (
            <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
          )}

          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="role">Role</Label>
            <Select.Root
              value={credentials.role}
              onValueChange={(value) =>
                setCredentials({
                  ...credentials,
                  role: value as Credentials["role"],
                })
              }
              required
            >
              <SelectTrigger id="role">
                <Select.Value placeholder="Select your role" />
                <SelectIcon>
                  <ChevronDownIcon />
                </SelectIcon>
              </SelectTrigger>

              <Select.Portal>
                <SelectContent>
                  <SelectViewport>
                    <SelectItem value="admin">
                      <Select.ItemText>admin</Select.ItemText>
                    </SelectItem>
                    <SelectItem value="accounting">
                      <Select.ItemText>accounting</Select.ItemText>
                    </SelectItem>
                    <SelectItem value="accounting-manager">
                      <Select.ItemText>accounting-manager</Select.ItemText>
                    </SelectItem>
                    <SelectItem value="finance">
                      <Select.ItemText>finance</Select.ItemText>
                    </SelectItem>
                    <SelectItem value="finance-manager">
                      <Select.ItemText>finance-manager</Select.ItemText>
                    </SelectItem>
                    <SelectItem value="it">it
                      <Select.ItemText>it</Select.ItemText>
                    </SelectItem>
                    <SelectItem value="it-manager">it
                      <Select.ItemText>it-manager</Select.ItemText>
                    </SelectItem>
                    <SelectItem value="marketing">
                      <Select.ItemText>marketing</Select.ItemText>
                    </SelectItem>
                    <SelectItem value="marketing-manager">
                      <Select.ItemText>marketing-manager</Select.ItemText>
                    </SelectItem>
                  </SelectViewport>
                </SelectContent>
              </Select.Portal>
            </Select.Root>
          </InputGroup>

          <ButtonLogin as={SubmitButton} type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </ButtonLogin>
        </Form>
      </Card>
    </PageContainer>
  );
};
