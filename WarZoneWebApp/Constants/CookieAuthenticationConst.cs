namespace WarZoneWebApp.Constants {
    public static class CookieAuthenticationConst {
        public static readonly int UnauthorizedStatusCode = 401;

        public static readonly string UnauthorizedResponseContentType = "application/json";

        public static readonly string UnauthorizedResponseBody = $"{{\"status\":{UnauthorizedStatusCode},\"statusText\":\"Unauthorized\"}}";

        public static readonly string TokenClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/token";
    }
}
