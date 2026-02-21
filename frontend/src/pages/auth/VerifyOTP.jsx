import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import API from "@/api/api";
import useAuth from "@/hooks/useAuth";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { login } = useAuth();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const email = state?.email;

  const handleVerify = async () => {
    if (!otp) return alert("Enter OTP");

    try {
      setLoading(true);

      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      // ✅ Save login after OTP
      login(res.data.user, res.data.token);

      alert("Verification successful 🚀");

      navigate("/");
    } catch (err) {
      console.log("OTP ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="text-center mt-20">
        <p>Email not found. Please register again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle>Verify OTP</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500 text-center">
            Due to domain/email issues, OTP may not be delivered. You can
            directly login without verification.
          </p>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>

          <Input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <Button className="w-full" onClick={handleVerify} disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
